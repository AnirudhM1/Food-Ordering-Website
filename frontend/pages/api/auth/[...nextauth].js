import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import User from '../../../models/User'

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile, tokens) {
                try {
                    const user = await User.findOrCreate(profile.name, profile.picture, profile.id, profile.email)
                } catch (e) {
                    console.error(e)
                }
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
            session.user.googleId = user.sub
            return session
        }
    }
}

export default (req, res) => NextAuth(req, res, options);