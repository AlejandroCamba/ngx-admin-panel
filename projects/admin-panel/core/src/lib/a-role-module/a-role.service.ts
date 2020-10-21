import { Injectable, SkipSelf } from '@angular/core';
import { Ability, RawRule, AbilityBuilder } from '@casl/ability';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

type RoleRules = Record<
    string,
    {
        actions: RawRule[];
    }
>;

@Injectable()
export class ARoleService {

    constructor(private ability: Ability) {}

    set workflowRules(workflowRules: RoleRules) {
        console.log('reglass de verdadd', this.ability.rules);
        this.workFlow$.next(workflowRules);
        console.log('reglass de verdadd', this.ability.rules);
    }
    static abilityInstance: Ability = null;
    private workFlow$ = new BehaviorSubject<RoleRules>({});

    static createAbility(role: string = 'admin', workflow?: RoleRules) {
        const defineAbilitiesWithWorkflow = userRole => {
            const { can, rules } = AbilityBuilder.extract();

            workflow[userRole].actions.forEach(rule => {
                can(rule.actions, rule.subject);
            });

            return rules;
        };

        const defineAbilitiesFor = defaultRole => {
            const { can, rules } = AbilityBuilder.extract();

            can('manage', 'all');

            return rules;
        };

        if (ARoleService.abilityInstance) {
            if (!workflow) {
                return ARoleService.abilityInstance;
            }
        }

        ARoleService.abilityInstance = new Ability(
            workflow ? defineAbilitiesWithWorkflow(role) : defineAbilitiesFor(role),
            {
                subjectName(subject) {
                    if (!subject || typeof subject === 'string') {
                        return subject;
                    }

                    return subject.__typename;
                }
            }
        );

        return ARoleService.abilityInstance;
    }

    public loadRoleWorkflow(role) {
        this.workFlow$.pipe(tap(() => console.log('actualizado'))).subscribe(workflow => {
            console.log(workflow[role].actions);
            ARoleService.abilityInstance = ARoleService.createAbility(role, workflow);
        });
    }

    public defineWorkflowRules(role: string, workflowRules: RoleRules) {
        const { can, rules } = AbilityBuilder.extract();

        can('create', workflowRules[role].actions);

        return rules;
    }
}
