import CustomError from './custom-error';

export default class ApiError extends CustomError {
    constructor(public statusCode: number, public message: string) {
        super(message);

        Object.setPrototypeOf(this, ApiError.prototype);
    }

    serializeErrors(): { message: string; field?: string }[] {
        return [{ message: this.message }];
    }
}
