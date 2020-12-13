interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                token: '1312312313',
                user: {
                    name: 'user1',
                    email: 'asd@asd.com',
                },
            });
        }, 2000);
    });
}