export default class ApiResponse {
    constructor(public statusCode: number, public data: any, public field: any = {}, public isFile: boolean = false) {}
}
