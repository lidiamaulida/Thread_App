import {v2 as cloudinary} from "cloudinary"

export default new class CloudinaryConfig {
    upload() {
        cloudinary.config({
            cloud_name: 'dxdasqb2z',
            api_key: '855286496214756',
            api_secret: 'f4yk0OF9gYywHSajSGv-cVGh_ak',
            secure: true,
        })
    }

    async destination(image: string | undefined) : Promise<any> {
        try {
            // const filename = image.split('/').pop()
            return await cloudinary.uploader.upload(`src/upload/${image}`)
        } catch (error) {
            throw error
        }
    }
}