/**
 * 描述: 相册工具
 * 版权: Copyright (c) 2016
 * 公司: 深圳市蓝书信息技术有限公司
 * 作者: 陈元
 * 版本: 1.0.0
 * 创建时间: 2017/2/8 11:21
 */
import ReactNativeImagePicker from 'react-native-image-picker';

// 相册控制对象
export const ImagePicker = {};

let options = {
    title: '选择照片', // 选择器的标题，可以设置为空来不显示标题
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照', // 调取摄像头的按钮，可以设置为空使用户不可选择拍照
    chooseFromLibraryButtonTitle: '从相册中选择', // 调取相册的按钮，可以设置为空使用户不可选择相册照片
    // customButtons: {
    //     // 'Choose Photo from Facebook': 'fb', // [按钮文字] : [当选择这个按钮时返回的字符串]
    // },
    storageOptions: {
        skipBackup: true,
        path: 'images'
    },
    quality: 1,// 图片品质
    // mediaType: 'photo', // 'photo' or 'video'
    // videoQuality: 'high', // 'low', 'medium', or 'high'
    // durationLimit: 10, // video recording max time in seconds
    maxWidth: 200, // photos only默认为手机屏幕的宽，高与宽一样，为正方形照片
    // maxHeight: 100, // photos only
    allowsEditing: true, // 当用户选择过照片之后是否允许再次编辑图片
};

// 打开相册
ImagePicker.showImagePicker = function () {
    return new Promise((resolve, reject) => {
        ReactNativeImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                // 取消
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // 选中照片
                resolve(response);
            }
        });
    });
};