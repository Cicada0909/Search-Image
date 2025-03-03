import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material'

import styles from './ImagesListItem.module.css'

const ImagesListItem = ({
    webformatURL,
    views,
    likes,
    comments,
    pickImageDetails,
}) => {
    return (
        <Card sx={{ maxWidth: 345 }} className={styles.Card}>
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
