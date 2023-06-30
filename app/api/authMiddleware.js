var jwt = require( 'jsonwebtoken' );

export const authMiddleware = async ( authHeader ) => {

    const token = await authHeader.get( 'authorization' ).split( " " )[ 1 ]
    return jwt.verify( token, process.env.JWT_SECRET, ( error, decoded ) => {
        if ( error ) {
            return false
        } else {
            return decoded
        }
    } )
}