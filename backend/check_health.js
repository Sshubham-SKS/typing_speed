const fs = require('fs');

async function check() {
    try {
        const res = await fetch('http://127.0.0.1:5000/api/health');
        const data = await res.json();
        fs.writeFileSync('health_check.txt', JSON.stringify(data, null, 2));
    } catch (err) {
        fs.writeFileSync('health_check.txt', 'Health check failed: ' + err.message);
    }
}
check();
