/// <reference types="Jest"/>

import checkHealth from "../health";

test('health', () => {
    expect(checkHealth().message).toBe("I am OK! Thanks for asking.");
});