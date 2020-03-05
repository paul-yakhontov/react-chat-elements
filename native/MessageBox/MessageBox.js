import React, { Component } from 'react';
import styles from './MessageBoxStyle.js';

import Avatar from '../Avatar/Avatar';

import {
    View,
    Text,
    Image,
} from 'react-native';

import {
    format,
} from 'timeago.js';

import IconI from 'react-native-vector-icons/Ionicons';
import IconM from 'react-native-vector-icons/MaterialIcons';



export class MessageBox extends Component {

    timeSince(date) {

        var seconds = Math.floor((new Date() - date) / 1000);

        var interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    render() {
        var positionCls = [
            styles.rceMbox,
            this.props.position === 'right' && styles.rceMboxRight,
        ];
        var thatAbsoluteTime = this.props.type !== 'text' && this.props.type !== 'file' && !(this.props.type === 'location' && this.props.text);

        return (
            <View
                style={styles.rceContainerMbox}
                onClick={this.props.onClick}>

                {
                    this.props.type === 'system' ?
                        null
                        :
                        <View
                            style={[
                                positionCls,
                            ]}>
                            <View
                                style={styles.rceMboxBody}>
                                {
                                    (this.props.title || this.props.avatar) &&
                                    <View
                                        style={[
                                            styles.rceMboxTitle,
                                            this.props.type === 'text' && styles.rceMboxTitleClear,
                                        ]}
                                        onClick={this.props.onTitleClick}>
                                        {
                                            this.props.avatar &&
                                            <View
                                                style={styles.rceMboxTitleAvatar}>
                                                <Avatar
                                                    size={{
                                                        width: 30,
                                                        height: 30,
                                                    }}
                                                    src={this.props.avatar} />
                                            </View>
                                        }
                                        <View>
                                            {
                                                this.props.title &&
                                                <Text
                                                    style={[
                                                        styles.rceMboxTitleText,
                                                        this.props.titleColor && { color: this.props.titleColor },
                                                    ]}>{this.props.title}</Text>
                                            }
                                        </View>
                                    </View>
                                }

                                {
                                    this.props.type === 'text' &&
                                    <Text
                                        style={styles.rceMboxText}>
                                        {this.props.text}
                                        {'\t\t\t\t\t'}
                                    </Text>
                                }

                                <View
                                    style={[
                                        styles.rceMboxTime,
                                        thatAbsoluteTime && styles.rceMboxTimeBlock
                                    ]}>
                                    <Text
                                        style={styles.rceMboxTimeText}>
                                        {
                                            this.props.date ?
                                            this.timeSince(this.props.date)+" ago" : null
                                        }
                                    </Text>
                                    {
                                        this.props.status &&
                                        <Text
                                            style={styles.rceMboxStatus}>
                                            {
                                                this.props.status === 'waiting' &&
                                                <IconM name='access-time' size={13} />
                                            }

                                            {
                                                this.props.status === 'sent' &&
                                                <IconM name='check' size={13} />
                                            }

                                            {
                                                this.props.status === 'received' &&
                                                <IconI name='md-done-all' size={13} />
                                            }

                                            {
                                                this.props.status === 'read' &&
                                                <IconI name='md-done-all' color='#4FC3F7' size={13} />
                                            }
                                        </Text>
                                    }
                                </View>
                            </View>
                        </View>
                }
            </View>
        );
    }
}

MessageBox.defaultProps = {
    position: 'left',
    type: 'text',
    text: '',
    title: null,
    titleColor: null,
    onTitleClick: null,
    onForwardClick: null,
    date: new Date(),
    data: {},
    onClick: null,
    onOpen: null,
    onDownload: null,
    forwarded: false,
    status: null,
    dateString: 'tarih',
    notch: true,
    avatar: null,
    renderAddCmp: null,
};

export default MessageBox;
