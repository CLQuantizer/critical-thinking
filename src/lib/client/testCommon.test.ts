import { expect,test } from 'vitest';
import {sanitize} from "$lib/client/common";

test.only('test', () => {
    const x = sanitize("hello    world");
    console.log(x);
    expect(x).toBe("hello world");
}, {timeout: 1000});
