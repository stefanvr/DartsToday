import { MockNgRedux } from "@angular-redux/store/lib/testing";

export function stubStoreProperty(selector, value) {
    let stub = MockNgRedux.getSelectorStub([selector]);
    stub.next(value);
    stub.complete();
}