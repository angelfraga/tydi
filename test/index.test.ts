import assert from 'assert/strict';
import { describe, it, mock } from 'node:test';
import { Main, Token, bootstrap, inject } from "../src";

describe('tydi', () => {
    it("should bootstrap & run Main class", () => {

        const spiedRun = mock.fn(() => { });
        class App implements Main {
            run = spiedRun
        }


        bootstrap([
            { provide: Main, useClass: App },
        ]);

        assert.strictEqual(spiedRun.mock.callCount(), 1);
    })

    it("should inject by class", () => {

        const MyService = new Token<MyService>('MyService');
        interface MyService {
            run(): void;
        }

        class App implements Main {
            myService = inject(MyService);
            run() {
                this.myService.run();
            }
        }

        const spiedRun = mock.fn(() => { });
        class MyServiceImpl implements MyService {
            run = spiedRun;
        }


        bootstrap([
            { provide: Main, useClass: App },
            { provide: MyService, useClass: MyServiceImpl },
        ]);

        assert.strictEqual(spiedRun.mock.callCount(), 1);
    })

    it("should inject by value", () => {

        const MyService = new Token<MyService>('MyService');
        interface MyService {
            run(): void;
        }

        class App implements Main {
            myService = inject(MyService);
            run() {
                this.myService.run();
            }
        }

        const spiedRun = mock.fn(() => { });
        const service: MyService = {
            run: spiedRun
        }


        bootstrap([
            { provide: Main, useClass: App },
            { provide: MyService, useValue: service },
        ]);

        assert.strictEqual(spiedRun.mock.callCount(), 1);
    })

    it("should inject by factory", () => {

        const MyService = new Token<MyService>('MyService');
        interface MyService {
            run(): void;
        }

        class App implements Main {
            myService = inject(MyService);
            run() {
                this.myService.run();
            }
        }

        const spiedRun = mock.fn(() => { });
        function myServiceFactory() {
            return {
                run: spiedRun
            }
        }


        bootstrap([
            { provide: Main, useClass: App },
            { provide: MyService, useFactory: myServiceFactory, deps: [] },
        ]);

        assert.strictEqual(spiedRun.mock.callCount(), 1);
    })

})