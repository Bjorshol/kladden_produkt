import configPromise from '@payload-config'
import { getPayload } from 'payload'

async function resetPassword() {
  try {
    const payload = await getPayload({ config: configPromise })

    // Find the user - assuming the admin email is demo-author@example.com
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'demo-author@example.com',
        },
      },
    })

    if (users.docs.length === 0) {
      console.log('User not found. Please check the email.')
      return
    }

    const user = users.docs[0]

    // Reset password to 'password'
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        password: 'password',
      },
    })

    console.log('Password reset successfully to "password"')
  } catch (error) {
    console.error('Error resetting password:', error)
  }
}

resetPassword()