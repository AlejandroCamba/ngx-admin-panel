import { Pipe, ChangeDetectorRef } from '@angular/core';
import { CanPipe } from '@casl/angular';
import { noop } from 'rxjs';
import { ARoleService } from '../a-role.service';
import { Ability } from '@casl/ability';

@Pipe({ name: 'can', pure: false })
export class MyCanPipe extends CanPipe {
    protected unsubscribeFromAbility: Function = noop;

    constructor(protected ability: Ability, protected cd: ChangeDetectorRef) {
        super(ARoleService.abilityInstance, cd);
    }

    transform(resource: any, action: string, field?: string) {
        if (this.unsubscribeFromAbility === noop) {
            this.unsubscribeFromAbility = ARoleService.abilityInstance.on('updated', () =>
                this.cd.markForCheck()
            );
        }

        return this.can(action, resource, field);
    }

    can(action: string, subject: any, field?: string) {
        return ARoleService.abilityInstance.can(action, subject, field);
    }

    ngOnDestroy() {
        this.unsubscribeFromAbility();
    }
}
