async function userExists(client, email) {
  const response = await client.query(
    'SELECT count(*) FROM users WHERE email = $1',
    [email]
  );
  const count = Number(response.rows[0].count);

  if (count === 1) {
    return true;
    } else {
        return false;
    }
  }

module.exports = userExists;
