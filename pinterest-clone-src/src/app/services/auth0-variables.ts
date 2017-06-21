interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
}

export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'h14d19SmWW9iWjt7hEEZi33HJQ7uzqNd',
    CLIENT_DOMAIN: 'andydlindsay.auth0.com',
    AUDIENCE: 'https://andydlindsay.auth0.com/userinfo',
    REDIRECT: 'http://localhost:4200/callback',
    SCOPE: 'openid user_metadata'
};
