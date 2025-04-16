const fs = require('fs');
const os = require('os');
const { execSync } = require('child_process');

const mapPackages = {
    linux: {
        libreoffice: 'libreoffice',
        pandoc: 'pandoc',
        imagemagick: 'imagemagick',
        ffmpeg: 'ffmpeg',
        '7zip': 'p7zip-full',
        unrar: 'unrar',
        inkscape: 'inkscape',
        poppler: 'poppler-utils',
    },
    darwin: {
        libreoffice: 'libreoffice',
        pandoc: 'pandoc',
        imagemagick: 'imagemagick',
        ffmpeg: 'ffmpeg',
        '7zip': 'p7zip',
        unrar: 'unrar',
        inkscape: 'inkscape',
        poppler: 'poppler',
    },
    win32: {
        libreoffice: 'libreoffice',
        pandoc: 'pandoc',
        imagemagick: 'imagemagick',
        ffmpeg: 'ffmpeg',
        '7zip': '7zip',
        unrar: 'winrar',
        inkscape: 'inkscape',
        poppler: 'ghostscript',
    },
};

const catchFunc = (fn, str) => {
    try {
        fn()
    } catch {
        console.error('[ERROR]', str)
        process.exit(1);
    }
}

const run = (cmd) => {
    catchFunc(() => {
        console.log(`[INFO] 👉 ${cmd}`);
        execSync(cmd, { stdio: 'ignore' });
    }, `❌ Failed: ${cmd}`)
}

const checkAdminRights = () => {
    const platform = os.platform();

    if (platform === 'win32') {
        catchFunc(() => {
            execSync('net session', { stdio: 'ignore' });
            console.log('[INFO] ✅ Admin rights detected.');
        }, '❌ Admin rights required. Please run as Administrator.')

        return;
    }

    if (platform === 'linux' || platform === 'darwin') {
        catchFunc(() => {
            execSync('sudo -v', { stdio: 'ignore' });
            console.log('[INFO] ✅ Admin (sudo) rights detected.');
        }, '❌ Admin rights required. Please run with sudo.')

        return;
    }
}


const getInstallCommand = (osPlatform, pkg) => {
    const name = mapPackages[osPlatform]?.[pkg];
    if (!name) return null;

    let cmd = '';
    switch (osPlatform) {
        case 'linux':
            cmd = `sudo apt install -y -q ${name}`;
            break;
        case 'darwin':
            cmd = `brew install --quiet --yes ${name}`;
            break;
        case 'win32':
            cmd = `choco install -y ${name}`;
            break;
        default:
            return null;
    }

    return cmd;
}

const main = () => {
    const platform = os.platform();
    const txt = fs.readFileSync('cli-requirements.txt', 'utf-8');
    const lines = txt
        .split('\n')
        .map(l => l.trim())
        .filter(l => l && !l.startsWith('#'));

    if (!['linux', 'darwin', 'win32'].includes(platform)) {
        console.error('[ERROR] ❌ Unsupported OS:', platform);
        return;
    }


    checkAdminRights();

    if (platform === 'darwin') {
        catchFunc(() => {
            execSync('brew -v', { stdio: 'ignore' });
        }, '❌ Homebrew not found! Install it from https://brew.sh')

        return;
    }

    if (platform === 'win32') {
        catchFunc(() => {
            execSync('choco -v', { stdio: 'ignore' });
        }, '❌ Chocolatey not found! Install it from https://chocolatey.org/install');

        return;
    }

    if (platform === 'linux') {
        catchFunc(() => {
            execSync('apt -v', { stdio: 'ignore' });
        }, '❌ APT package manager not found! Ensure you are using a Debian-based distro.');

        return;
    }

    console.log(`[INFO] 🛠 Installing CLI tools for ${platform.toUpperCase()}...`);

    for (const pkg of lines) {
        const cmd = getInstallCommand(platform, pkg);
        if (cmd) run(cmd);
        else console.warn(`[WARN] ⚠️ No installer mapping for "${pkg}"`);
    }

    console.log('[INFO] ✅ Done!');
}

main();
