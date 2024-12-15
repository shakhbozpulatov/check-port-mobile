// server/api/passkit.js
import fs from 'fs'
import { defineEventHandler, sendStream } from 'h3' // H3 is Nuxt's underlying server framework
import passkit from 'passkit-generator'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    // Define pass fields
    const pass = passkit.createPass({
      model: 'boardingPass', // Or any pass type you need
      passTypeIdentifier: 'pass.com.example', // Your Apple pass identifier
      teamIdentifier: 'YOUR_TEAM_IDENTIFIER',
      organizationName: 'My Organization',
      description: 'Boarding Pass',
      foregroundColor: 'rgb(255,255,255)',
      backgroundColor: 'rgb(0,122,255)',
      logoText: 'Flight Info',
    })

    // Add pass details like barcode, relevant information
    pass.barcode({
      message: '1234567890',
      format: 'PKBarcodeFormatQR',
      messageEncoding: 'iso-8859-1',
    })

    // Load assets like logo, background, etc. from static directory
    pass.loadImagesFrom(path.join(process.cwd(), 'assets/passkit-images'))

    // Define paths to your certificates
    const certificatePath = path.join(
      process.cwd(),
      'certificates/pass_certificate.pem',
    )
    const privateKeyPath = path.join(
      process.cwd(),
      'certificates/privateKey.pem',
    )
    const wwdrCertPath = path.join(
      process.cwd(),
      'certificates/AppleWWDRCA.pem',
    )

    // Sign the pass with your certificates
    const passStream = await pass.generate({
      wwdr: fs.readFileSync(wwdrCertPath),
      signerCert: fs.readFileSync(certificatePath),
      signerKey: fs.readFileSync(privateKeyPath),
      password: 'CERTIFICATE_PASSWORD', // Certificate password
    })

    // Set the correct response headers for .pkpass files
    event.res.setHeader('Content-Type', 'application/vnd.apple.pkpass')
    event.res.setHeader(
      'Content-Disposition',
      'attachment; filename=boardingPass.pkpass',
    )
    console.log('server api working in pass kit')
    // Send the pass to the client
    return sendStream(event, passStream)
  } catch (error) {
    event.res.statusCode = 500
    return { error: 'Failed to generate pass.' }
  }
})
