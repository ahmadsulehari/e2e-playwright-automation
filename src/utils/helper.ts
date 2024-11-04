import {CustomObjectType, JobPayloadType} from "../types/customTypes";
import apiTestData from "../data/apiTestData.json";
import generator from 'generate-password-ts';
import {Locator} from "@playwright/test";

function randomNumber() {
    return generator.generate({
        length: 6,
        numbers: true,
        exclude: 'abcdefghijhklmnopqrstuvwxyz',
        uppercase: false,
        excludeSimilarCharacters: true,
    });
}

function verifyKeyExists(
    obj: JobPayloadType | CustomObjectType,
    key: string,
): boolean {
    if (!key) {
        throw new Error(`key: ${key} doesn't exist`);
    }
    return key in obj;
}

function retrieveInvalidKeys(
    obj: JobPayloadType | CustomObjectType,
    keys: string[],
): string[] {
    if (!obj) {
        throw new Error(`invalid obj: ${obj}`);
    }
    return keys.filter((key) => !verifyKeyExists(obj, key));
}

export async function clearAndType(locator: Locator, value: string) {
    await locator.clear();
    await locator.fill(value)
}


export function testEmail(): string {
    return `testingEmail-${randomNumber()}@yopmail.com`;
}

export function getNewJobPayload(
    args: JobPayloadType | CustomObjectType | CustomObjectType[],
    payload: JobPayloadType = apiTestData.newJobPayload,
    nestedAttribute: string = '',
    isNested = false,
): JobPayloadType {

    let invalidKeys: string[];

    if (
        isNested &&
        nestedAttribute &&
        verifyKeyExists(payload, nestedAttribute)
    ) {
        invalidKeys = retrieveInvalidKeys(
            payload[nestedAttribute] as CustomObjectType,
            Object.keys(args),
        );
    } else {
        invalidKeys = retrieveInvalidKeys(payload, Object.keys(args));
    }
    if (invalidKeys.length) {
        throw new Error(`invalid keys found : ${invalidKeys}`);
    }

    return isNested && nestedAttribute
        ? ({
            ...payload,
            [nestedAttribute]: {
                ...(payload[nestedAttribute] as typeof args),
                ...args,
            } as CustomObjectType,
        }) as JobPayloadType
        : ({ ...payload, ...args }) as JobPayloadType;
}

export function randomJobName(): string {
    return `Test Automation Job - ${randomNumber()}`;
}