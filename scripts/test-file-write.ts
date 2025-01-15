import fs from 'fs/promises'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'data', 'test-write.json')

async function testFileWrite() {
  try {
    const testData = { test: 'This is a test write' }
    await fs.writeFile(dataFilePath, JSON.stringify(testData, null, 2))
    console.log('Test file written successfully')

    const readData = await fs.readFile(dataFilePath, 'utf-8')
    console.log('Read test file:', readData)

    await fs.unlink(dataFilePath)
    console.log('Test file deleted successfully')
  } catch (error) {
    console.error('Error during file write test:', error)
  }
}

testFileWrite()

