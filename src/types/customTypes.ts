export type CustomObjectType = Record<string, number | string | boolean>;

export type JobPayloadType = Record<
    string,
    number | string | boolean | null | CustomObjectType[] | CustomObjectType
>;