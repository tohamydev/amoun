import fs from 'fs/promises'
import path from 'path'

const dataDir = path.join(process.cwd(), 'data')
const dataFilePath = path.join(dataDir, 'data.json')
const backupFilePath = path.join(dataDir, 'data.backup.json')

async function checkAndSetPermissions() {
  try {
    // Ensure data directory exists
    await fs.mkdir(dataDir, { recursive: true })

    // Check and set permissions for data directory
    await fs.chmod(dataDir, 0o755)
    console.log('Data directory permissions set to 755')

    // Check and set permissions for data.json
    try {
      await fs.access(dataFilePath)
      await fs.chmod(dataFilePath, 0o644)
      console.log('data.json permissions set to 644')
    } catch (error) {
      console.log('data.json does not exist, creating it...')
      await fs.writeFile(dataFilePath, '{}')
      await fs.chmod(dataFilePath, 0o644)
      console.log('data.json created and permissions set to 644')
    }

    // Check and set permissions for data.backup.json
    try {
      await fs.access(backupFilePath)
      await fs.chmod(backupFilePath, 0o644)
      console.log('data.backup.json permissions set to 644')
    } catch (error) {
      console.log('data.backup.json does not exist, creating it...')
      await fs.writeFile(backupFilePath, '{}')
      await fs.chmod(backupFilePath, 0o644)
      console.log('data.backup.json created and permissions set to 644')
    }

    console.log('All permissions set successfully')
  } catch (error) {
    console.error('Error setting permissions:', error)
  }
}

checkAndSetPermissions()

