const { exec } = require('child_process');

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = document.getElementById('statusText');

function checkVPNStatus() {
    exec('sc query PanGPS', (error, stdout) => {
        if (stdout.includes('RUNNING')) {
            statusIndicator.classList.add('running');
            statusIndicator.classList.remove('stopped');
            statusText.textContent = 'VPN is running';
            startBtn.disabled = true;
            stopBtn.disabled = false;
        } else {
            statusIndicator.classList.add('stopped');
            statusIndicator.classList.remove('running');
            statusText.textContent = 'VPN is stopped';
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });
}

startBtn.addEventListener('click', () => {
    exec('net start PanGPS', (error) => {
        if (error) {
            alert('Error starting VPN service');
        }
        checkVPNStatus();
    });
});

stopBtn.addEventListener('click', () => {
    exec('net stop PanGPS', (error) => {
        if (error) {
            alert('Error stopping VPN service');
        }
        checkVPNStatus();
    });
});

// Check status every 5 seconds
checkVPNStatus();
setInterval(checkVPNStatus, 5000);