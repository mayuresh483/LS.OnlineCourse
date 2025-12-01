export const environment = {
    env_name: 'dev',
    apiUrl: 'https://localhost:44318/api',
    apiEndpoints: {
        userProfile: 'user-profile',
    },
    adb2cConfig: {
        // chatHubUrl: 'https://localhost:7005/chathub', // Correct URL
        clientId: '7a40596f-589f-4de8-b3ed-5a99fb63060a',
        readScopeUrl: 'https://myonlinecourse.onmicrosoft.com/dev/api/User:Read',
        writeScopeUrl: 'https://myonlinecourse.onmicrosoft.com/dev/api/User.Write',
        scopeUrls:[
        'https://myonlinecourse.onmicrosoft.com/dev/api/User:Read',
        'https://myonlinecourse.onmicrosoft.com/dev/api/User.Write'
        ],
        apiEndpointUrl: 'https://localhost:44318/api'
    },
}