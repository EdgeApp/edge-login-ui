import { wrap } from 'cavy'
import * as ReactNative from 'react-native'
// All wrapped components

export const View = wrap(ReactNative.View)
export const Text: ReactNative.TextComponent = wrap(ReactNative.Text)
export const Image = wrap(ReactNative.Image)
export const TextInput = wrap(ReactNative.TextInput)
export const ScrollView = wrap(ReactNative.ScrollView)
export const StyleSheet = wrap(ReactNative.StyleSheet)
export const Button = wrap(ReactNative.Button)
export const Switch = wrap(ReactNative.Switch)
export const FlatList = wrap(ReactNative.FlatList)
export const SectionList = wrap(ReactNative.SectionList)
export const BackHandler = wrap(ReactNative.BackHandler)
export const DrawerLayoutAndroid = wrap(ReactNative.DrawerLayoutAndroid)
export const PermissionsAndroid = wrap(ReactNative.PermissionsAndroid)
export const ToastAndroid = wrap(ReactNative.ToastAndroid)
export const ActionSheetIOS = wrap(ReactNative.ActionSheetIOS)
export const ActivityIndicator = wrap(ReactNative.ActivityIndicator)
export const Alert = wrap(ReactNative.Alert)
export const Animated = wrap(ReactNative.Animated)
export const Dimensions = wrap(ReactNative.Dimensions)
export const KeyboardAvoidingView = wrap(ReactNative.KeyboardAvoidingView)
export const Linking = wrap(ReactNative.Linking)
export const Modal = wrap(ReactNative.Modal)
export const PixelRatio = wrap(ReactNative.PixelRatio)
export const RefreshControl = wrap(ReactNative.RefreshControl)
export const StatusBar = wrap(ReactNative.StatusBar)
export const TouchableWithoutFeedback = wrap(
  ReactNative.TouchableWithoutFeedback
)

// Accesability only
export const Keyboard = ReactNative.Keyboard
export const AppState = ReactNative.AppState
export const Easing = ReactNative.Easing
export const TouchableOpacity = ReactNative.TouchableOpacity
