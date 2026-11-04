export interface ApiValidationError {
    loc: (string | number)[]
    msg: string
    type: string
}

export type ApiErrorDetail = string | ApiValidationError[]

export class ApiError extends Error {
    readonly status: number
    readonly detail: ApiErrorDetail

    constructor(status: number, detail: ApiErrorDetail) {
        const message =
            typeof detail === "string"
                ? detail
                : detail.map((error) => error.msg).join(", ")

        super(message)

        this.name = "ApiError"
        this.status = status
        this.detail = detail
    }
}