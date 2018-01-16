import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import sha1 from 'sha1'
import superagent from 'superagent'

class Images extends Component {

	constructor(){
		super()
		this.state = {
			images: []
		}
	}

	uploadFile(files){
		console.log('uploadFile: ')
		const image = files[0]

		const cloudName = 'dgcnhgtjw'

		const url = 'http://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

		const timestamp = Date.now()/1000
		const uploadPreset = 'ic5m0blu'

		const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'u_eoEfpwlsvCZvzJZZniyAuaxQY'

		const signature = sha1(paramsStr)
		const params = {
			'api_key': '634143159227421',
			'timestamp': timestamp,
			'upload_preset': uploadPreset,
			'signature': signature
					}

					let uploadRequest = superagent.post(url)
					uploadRequest.attach('file', image)

					Object.keys(params).forEach((key) => {
						uploadRequest.field(key,params[key])
					})

					uploadRequest.end((err, resp) => {
						if (err){
								alert(err)
								return
						}

						console.log('UPLOAD COMPLETE: ' +JSON.stringify(resp.body))
						const uploaded = resp.body

						let updatedImages = Object.assign([], this.state.images)
						updatedImages.push(uploaded)

						this.setState({
							images: updatedImages
						})
					})

	}

	render(){

		const list = this.state.images.map((image, i ) => {
			return (
					<li key={i}>
						<img src={image.secure_url} />
					</li>
				)
		})

		return (
			<div>
					Images Component
					<Dropzone onDrop={this.uploadFile.bind(this)} />
					<ol>
						{ list }
					</ol>
			</div>
		)
	}
}

export default Images