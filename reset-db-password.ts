import bcrypt from 'bcrypt'
import pkg from 'pg'
const { Client } = pkg

async function resetPassword() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL || 'postgresql://127.0.0.1:54320/your-database-name',
  })

  try {
    await client.connect()

    // Hash the password
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash('password', saltRounds)

    // Update the user
    const res = await client.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashedPassword, 'demo-author@example.com']
    )

    console.log(`Password reset for user. Rows affected: ${res.rowCount}`)
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.end()
  }
}

resetPassword()