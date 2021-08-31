import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import User from '../../../models/User'

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile, tokens) {
                console.log('REACHED profile');
                console.log({ profile });
                try {
                    const user = await User.findOrCreate(profile.name, profile.picture, profile.id, profile.email)
                    console.log('user:', user)
                } catch (e) {
                    console.error(e)
                }
                console.log('Completed profile. Ready to return')
                return {
                    id: profile.id,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture
                }
            }
        })
    ],
    callbacks: {
        async session(session, user) {
            console.log('Reached session callback')
            session.user.googleId = user.sub
            return session
        },
        async redirect(url, baseUrl) {
            console.log('Reached redirect callback')
            return url;
        }
    }
}

export default (req, res) => NextAuth(req, res, options);