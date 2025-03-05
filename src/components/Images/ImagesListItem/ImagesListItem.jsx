import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown'

import styles from './ImagesListItem.module.css'
import { useState } from 'react'

const ImagesListItem = ({
    webformatURL,
    views,
    likes,
    comments,
    pickImageDetails,
    imageName,
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const downloadImage = async (url, filename) => {
        try {
            const response = await fetch(url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = blobUrl
            link.download = filename
            // console.log(link)
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch (e) {}
    }

    return (
        <Card
            sx={{ maxWidth: 345 }}
            className={styles.Card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`${styles.card__btnDownload} ${styles.invisible} ${isHovered ? styles.visible : ''}`}
                onClick={() => downloadImage(webformatURL, imageName)}
            >
                <ArrowCircleDownIcon fontSize="large" color="primary" />
            </div>

            <CardActionArea onClick={pickImageDetails}>
                <CardMedia
                    component="img"
                    height="140"
                    image={webformatURL}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom component="div">
                        Views: {views}
                    </Typography>
                    <Typography gutterBottom component="div">
                        Likes: {likes}
                    </Typography>
                    <Typography gutterBottom component="div">
                        Сomments: {comments}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default ImagesListItem
