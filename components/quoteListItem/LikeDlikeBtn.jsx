"use client"

import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp as thumbsUpFill, faThumbsDown as thumbsDownFill, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp as thunmbsUpOutline, faThumbsDown as thumbsDownOutline } from "@fortawesome/free-regular-svg-icons"
import Styles from "./quoteItem.module.css"
import { usePathname, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { deleteQuoteAction, editQuoteAction, likeDislikeQuoteAction } from '@/redux/actions/quoteActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const LikeDlikeBtn = ( { quote, loginUser } ) => {

    const pathname = usePathname()
    const dispatch = useDispatch()
    const allQuotes = useSelector( state => state.allQuotes )
    const router = useRouter()
    const [ isLiked, setIsLiked ] = useState( false )
    const [ isDisLiked, setIsDisLiked ] = useState( false )
    const [ finalQuotes, setFinalQuotes ] = useState( quote )
    const [ deleteModalShow, setDeleteModalShow ] = React.useState( false );

    useEffect( () => {
        if ( allQuotes?.length > 0 && pathname === "/profile" ) {
            const filteredQuote = allQuotes.filter( singleQ => singleQ?._id === quote?._id )[ 0 ]
            setFinalQuotes( filteredQuote )
        } else {
            setFinalQuotes( quote )
        }
    }, [ allQuotes, quote ] )

    useEffect( () => {
        finalQuotes?.likes?.length > 0
            ?
            finalQuotes?.likes?.filter( like => like?.userId === loginUser?.user?._id )?.length > 0
                ? setIsLiked( true )
                : setIsLiked( false )
            : setIsLiked( false )

        finalQuotes?.dislikes?.length > 0
            ?
            finalQuotes?.dislikes?.filter( disLike => disLike?.userId === loginUser?.user?._id )?.length > 0
                ? setIsDisLiked( true )
                : setIsDisLiked( false )
            : setIsDisLiked( false )
    }, [ quote, finalQuotes ] )


    const handleClickLikeOutlineBtn = () => {

        if ( loginUser === undefined ) {
            router.push( "/login" )
        } else {
            dispatch( likeDislikeQuoteAction( quote?._id, {
                userId: loginUser?.user?._id,
                like: true
            }, loginUser?.token, router ) )
        }
    }

    const handleClickLikeFillBtn = () => {
        if ( loginUser === undefined ) {
            router.push( "/login" )
        } else {
            dispatch( likeDislikeQuoteAction( quote?._id, {
                userId: loginUser?.user?._id,
                like: false
            }, loginUser?.token, router ) )
        }
    }

    const handleClickDisLikeOutlineBtn = () => {

        if ( loginUser === undefined ) {
            router.push( "/login" )
        } else {
            dispatch( likeDislikeQuoteAction( quote?._id, {
                userId: loginUser?.user?._id,
                dislikes: true
            }, loginUser?.token, router ) )
        }
    }

    const handleClickDisLikeFillBtn = () => {
        if ( loginUser === undefined ) {
            router.push( "/login" )
        } else {
            dispatch( likeDislikeQuoteAction( quote?._id, {
                userId: loginUser?.user?._id,
                dislikes: false
            }, loginUser?.token, router ) )
        }
    }

    const handleClickEditBtn = () => {
        dispatch( editQuoteAction( quote?._id, {
            userId: loginUser?.user?._id,
            quote: quote?.quote
        }, loginUser?.token ) )
    }

    const handleClickDeleteYesBtn = () => {
        dispatch( deleteQuoteAction( quote?._id, { userId: loginUser?.user?._id }, loginUser?.token, setDeleteModalShow, router ) )
    }

    return (
        <>
            <span className={`${Styles.icon_btn_container}`}>
                {
                    isLiked
                        ?
                        <>
                            <FontAwesomeIcon icon={thumbsUpFill} className={`${Styles.thumb_up_icon}`} onClick={handleClickLikeFillBtn} />
                            {
                                isDisLiked
                                    ?
                                    <FontAwesomeIcon icon={thumbsDownFill} className={`${Styles.thumb_up_icon}`} onClick={handleClickDisLikeFillBtn} />
                                    :
                                    <FontAwesomeIcon icon={thumbsDownOutline} className={`${Styles.thumb_up_icon}`} onClick={handleClickDisLikeOutlineBtn} />
                            }
                        </>
                        :
                        <>
                            <FontAwesomeIcon icon={thunmbsUpOutline} className={`${Styles.thumb_up_icon}`} onClick={handleClickLikeOutlineBtn} />
                            {
                                isDisLiked
                                    ?
                                    <FontAwesomeIcon icon={thumbsDownFill} className={`${Styles.thumb_up_icon}`} onClick={handleClickDisLikeFillBtn} />
                                    :
                                    <FontAwesomeIcon icon={thumbsDownOutline} className={`${Styles.thumb_up_icon}`} onClick={handleClickDisLikeOutlineBtn} />
                            }
                        </>
                }
                {
                    pathname === "/profile"
                        ?
                        <>
                            <button className={`${Styles.edit_btn}`} onClick={handleClickEditBtn}>
                                <FontAwesomeIcon icon={faPen} className={`${Styles.logoIcon} `} />
                                <span className={`${Styles.tooltip}`}>Edit</span>
                            </button>
                            <button className={`${Styles.delete_btn}`} onClick={() => setDeleteModalShow( true )}>
                                <FontAwesomeIcon icon={faTrash} className={`${Styles.logoIcon} `} />
                                <span className={`${Styles.tooltip}`}>Delete</span>
                            </button>
                        </>
                        : null
                }
            </span>
            <Modal
                show={deleteModalShow}
                onHide={() => setDeleteModalShow( false )}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton >
                </Modal.Header>
                <Modal.Body>
                    <h5>Are you sure you want to delete this quote?</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={handleClickDeleteYesBtn}>Yes</Button>
                    <Button onClick={() => setDeleteModalShow( false )}>No</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default LikeDlikeBtn