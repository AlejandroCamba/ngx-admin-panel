import { Component, AfterViewInit } from '@angular/core';
import { AdminTableComponent } from '@ngx-admin-panel/components';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../../http/services/api.service';
import { concatAll, map, concatMap, tap } from 'rxjs/operators';

@Component({
    selector: 'game-relation-table',
    template: `<ngx-admin-table></ngx-admin-table>`,
})
export class ConsoleServerGameComponent extends AdminTableComponent implements AfterViewInit {
    constructor(private apiService: ApiService) {
        super();
    }

    onDeleteConfirm = ({ data: { id }, confirm }) => {
        if (window.confirm('Are you sure you want to delete?')) {
            this.loadingOn();
            this.apiService.delete(`console-to-server-to-game/${id}`).subscribe(
                (response) => {
                    this.handleSuccessReq('CSG deleted succesfully');
                },
                (err) => this.handleErrorReq(err.message),
                () => this.loadingOff()
            );
            confirm.resolve();
        } else {
            confirm.reject();
        }
    };

    onCreateConfirm = (event) => {
        if (window.confirm('Are you sure you want to create?')) {
            delete event.newData.id;
            this.loadingOn();
            this.apiService.post(`console-to-server-to-game`, event.newData).subscribe(
                (response) => {
                    this.handleSuccessReq('CSG created successfully');
                    event.confirm.resolve();
                },
                (err) => this.handleErrorReq(err.message),
                () => this.loadingOff()
            );
        } else {
            event.confirm.reject();
        }
    };

    onSaveConfirm = ({ newData, confirm }) => {
        if (window.confirm('Are you sure you want to update?')) {
            const dataCopy = { ...newData };
            delete dataCopy.id;
            this.loadingOn();
            this.handleSuccessReq('CSG updated successfully');
            this.apiService.put(`console-to-server-to-game/${newData.id}`, dataCopy).subscribe(
                (response) => {
                    confirm.resolve();
                },
                (err) => this.handleErrorReq(err.message),
                () => this.loadingOff()
            );
        } else {
            confirm.reject();
        }
    };

    ngAfterViewInit() {
        this.setTitle('Relations');
        this.apiService
            .get('game')
            .pipe(
                concatMap((games) =>
                    this.apiService
                        .get('game-console')
                        .pipe(map((consoles) => ({ games, consoles })))
                ),
                concatMap((mergedGamesAndConsole) =>
                    this.apiService
                        .get('game-server')
                        .pipe(map((servers) => ({ ...mergedGamesAndConsole, servers })))
                ),
                concatMap((allInfo) =>
                    this.apiService
                        .get('console-to-server-to-game')
                        .pipe(map((relations) => ({ ...allInfo, relations })))
                )
            )
            .subscribe(
                (result) => {
                    this.loadTableColumns({
                        id: {
                            title: 'ID',
                            type: 'number',
                        },
                        gameConsole: {
                            title: 'Console',
                            type: 'html',
                            editor: {
                                type: 'list',
                                config: {
                                    list: result.consoles.map((gameConsole) => ({
                                        value: gameConsole.id,
                                        title: gameConsole.name,
                                    })),
                                },
                            },
                        },
                        gameServer: {
                            title: 'Server',
                            type: 'html',
                            editor: {
                                type: 'list',
                                config: {
                                    list: result.servers.map((gameServer) => ({
                                        value: gameServer.id,
                                        title: gameServer.name,
                                    })),
                                },
                            },
                        },
                        game: {
                            title: 'Game',
                            type: 'html',
                            editor: {
                                type: 'list',
                                config: {
                                    list: result.games.map((games) => ({
                                        value: games.id,
                                        title: games.name,
                                    })),
                                },
                            },
                        },
                    });

                    this.loadDataSource(
                        result.relations.map((relation) => {
                            delete relation.createdAt;
                            delete relation.updatedAt;
                            return {
                                id: relation.id,
                                gameConsole: relation.gameConsole.name,
                                gameServer: relation.gameServer.name,
                                game: relation.game.name,
                            };
                        })
                    );
                },
                (err) => this.handleErrorReq(err.message),
                () => this.loadingOff()
            );
    }
}
