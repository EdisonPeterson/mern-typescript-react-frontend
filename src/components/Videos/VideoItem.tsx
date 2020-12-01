import React from 'react';
import ReactPlayer from 'react-player';
import { useHistory } from 'react-router-dom';
import { Video } from './Video';
import * as videoService from './VideoService';

import './VideoItem.css';

interface Props {
	video: Video;
	loadVideos: () => void;
}

const VideoItem = ({ video, loadVideos }: Props) => {
	const history = useHistory();

	const handleDelete = async (id: string) => {
		await videoService.deleteVideo(id);
		loadVideos();
	};
	return (
		<div className='col-md-4'>
			<div className='card card-body video-card'>
				<div className='d-flex justify-content-between'>
					<h2 onClick={() => history.push(`/update/${video._id}`)}>
						{video.title}
					</h2>
					<span
						className='text-danger'
						onClick={() => video._id && handleDelete(video._id)}>
						x
					</span>
				</div>
				<p>{video.description}</p>
				<div className='embed-responsive embed-responsive-16by9'>
					<ReactPlayer url={video.url} />
				</div>
			</div>
		</div>
	);
};

export default VideoItem;
