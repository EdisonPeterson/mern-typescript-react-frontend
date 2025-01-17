import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Video } from './Video'
import * as videoService from './VideoService'

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

interface Params {
    id: string
}
export const Videoform = () => {

    const history = useHistory()
    const params = useParams<Params>()

    const initialState= {
        title: '', 
        description:'', 
        url: ''
    }

    const [video, setVideo] = useState<Video>(initialState)

    const handleInputChange = (e: InputChange) => {
        setVideo({...video, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!params.id) {
            await videoService.createVideo(video)
            toast.success('new video added')
            setVideo(initialState)
        } else {
            await videoService.updateVideo(params.id, video)
        }

        history.push('/')
    }

    const getVideo = async (id: string) => {
        const res = await videoService.getVideo(id)
        const { title, description, url } = res.data;
        setVideo({title, description, url})
    }

    useEffect(() => {
        if(params.id) getVideo(params.id)
    }, [])

    return (
        <div className="row">
            <div className="col-md-4 offset-md-4">
                <div className="card">
                    <div className="card-body">
                        <h3>New video</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                type="text" 
                                name="title"
                                placeholder="Write a title for this video" 
                                className="form-control" 
                                onChange={handleInputChange}
                                value={video.title}
                                autoFocus/>
                            </div>

                            <div className="form-group">
                                <input 
                                type="text" 
                                name="url"
                                placeholder="https://somesite.com" 
                                className="form-control"
                                onChange={handleInputChange} 
                                value={video.url}
                                autoFocus/>
                            </div>

                            <div className="form-group">
                                <textarea 
                                name="description" 
                                rows={3} 
                                className="form-control" 
                                onChange={handleInputChange}
                                value={video.description}
                                placeholder="Write a description"></textarea>
                            </div> 
                            
                            {
                                params.id ? 
                                <button className="btn btn-info w-100">Update Video</button> :
                                <button className="btn btn-primary w-100">Create Video</button>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
