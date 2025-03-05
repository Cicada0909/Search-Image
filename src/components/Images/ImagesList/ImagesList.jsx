import axios from 'axios'
import { useEffect, useState } from 'react'
import ImagesListItem from '../ImagesListItem/ImagesListItem'
import styles from './ImagesList.module.css'
import {
    Button,
    Checkbox,
    Divider,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Link,
    ListItem,
    ListItemText,
    MenuItem,
    MenuList,
    Paper,
    Radio,
    RadioGroup,
} from '@mui/material'

import { useQuery } from '@tanstack/react-query'
import { ModalWindow } from '../../Modal/ModalWindow'

const ImagesList = () => {
    const API_KEY = Введите ваш API_KEY!!! ""

    const [search, setSearch] = useState('')
    const [images, setImages] = useState([])
    const [history, setHistory] = useState([])
    const [filter, setFilter] = useState('')
    const [filteredImages, setFilteredImages] = useState([])
    const [image, setImage] = useState({})
    const [modal, setModal] = useState('')

    const handleSearch = async () => {
        if (!search) {
            return
        }

        axios
            .get(
                `https://pixabay.com/api/?key=${API_KEY}&q=${search}&image_type=photo`
            )
            .then((response) => {
                const data = response.data
                setImages(data.hits)

                updateHistoryList()
            })
            .catch((e) => {})
        console.log(images)
    }

    const Search = async (image) => {
        axios
            .get(
                `https://pixabay.com/api/?key=${API_KEY}&q=${image}&image_type=photo`
            )
            .then((response) => {
                const data = response.data
                setImages(data.hits)

                updateHistoryList()
            })
            .catch((e) => {})
        console.log(images)
    }

    const updateHistoryList = () => {
        const storedHistory =
            JSON.parse(localStorage.getItem('searchHistory')) || []

        const updatedHistory = [search, ...storedHistory]

        setHistory(updatedHistory)

        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory))

        setHistory(updatedHistory)
    }

    useEffect(() => {
        updateHistoryList()
    }, [])

    const handleInput = (e) => {
        setSearch(e.target.value)
    }

    const reSearch = (item) => {
        Search(item)
    }

    const imageDetails = (item) => {
        setImage(item)
        setModal(true)
    }

    const closeWindow = () => {
        setModal(false)
    }

    useEffect(() => {
        if (filter === 'Views') {
            const filtredImages = [...images].sort((a, b) => b.views - a.views)
            setFilteredImages(filtredImages)
        } else if (filter === 'Likes') {
            const filtredImages = [...images].sort((a, b) => b.likes - a.likes)
            setFilteredImages(filtredImages)
        } else if (filter === 'Comments') {
            const filtredImages = [...images].sort(
                (a, b) => b.comments - a.comments
            )
            setFilteredImages(filtredImages)
        } else {
            setFilteredImages(images)
        }
    }, [filter, images])

    return (
        <div className={styles.page}>
            {modal && (
                <ModalWindow
                    img={image.largeImageURL}
                    btnClose={() => closeWindow()}
                />
            )}
            <div className={styles.history}>
                <Paper sx={{ width: 250 }}>
                    <MenuList className={styles.menu}>
                        {history.map((item, index) => (
                            <MenuItem className={styles.menu__item} key={index}>
                                <ListItemText
                                    className={styles.menu__text}
                                    inset
                                    key={index}
                                    onClick={() => reSearch(item)}
                                >
                                    {item}
                                </ListItemText>
                                <Divider />
                            </MenuItem>
                        ))}
                    </MenuList>
                </Paper>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.header__search}>
                        <Button variant="outlined" onClick={handleSearch}>
                            Search
                        </Button>
                        <input
                            type="text"
                            placeholder="Search"
                            value={search}
                            onChange={handleInput}
                        />
                    </div>
                    <div className={styles.wrapper__form}>
                        <FormControl className={styles.form}>
                            <FormLabel
                                id="demo-row-radio-buttons-group-label"
                                sx={{ fontSize: '1.5rem' }}
                                className={styles.form__title}
                            >
                                Sorting
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                className={styles.form__radio}
                            >
                                <FormControlLabel
                                    value="Views"
                                    control={<Radio />}
                                    label="Views"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <FormControlLabel
                                    value="Likes"
                                    control={<Radio />}
                                    label="Likes"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <FormControlLabel
                                    value="Comments"
                                    control={<Radio />}
                                    label="Comments"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <FormControlLabel
                                    value="None"
                                    control={<Radio />}
                                    label="None"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </RadioGroup>
                        </FormControl>
                    </div>
                </div>
                <div className={styles.list}>
                    {!filteredImages &&
                        images.map((item) => (
                            <ImagesListItem
                                key={item.id}
                                {...item}
                                pickImageDetails={() => imageDetails(item)}
                                imageName={search}
                            />
                        ))}
                    {filteredImages &&
                        filteredImages.map((item) => (
                            <ImagesListItem
                                key={item.id}
                                {...item}
                                pickImageDetails={() => imageDetails(item)}
                                imageName={search}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}

export default ImagesList
