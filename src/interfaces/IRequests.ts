interface IGetUserRequest {
    id?: number
}

interface IGetUsersRequest {
    loginSubstring?: string,
    limit?: number
}

export * as Requests;