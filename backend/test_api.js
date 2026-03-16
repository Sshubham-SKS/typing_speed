const fs = require('fs');

async function test() {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: "Test",
            email: "test2@test.com",
            password: "password123"
        })
    });
    const text = await response.text();
    fs.writeFileSync('out.txt', `Status: ${response.status} - Body: ${text}`);
  } catch (error) {
    fs.writeFileSync('out.txt', `Network Error: ${error.message}`);
  }
}
test();
