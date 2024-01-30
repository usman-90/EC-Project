import React, { useState } from 'react'
import { Button, Dimensions, Image, Text, View } from 'react-native'
import topWave from '../../../assets/Home/topWave.png'
import logo from '../../../assets/Home/logo.png'
import buildingIcon from '../../../assets/Home/buildingIcon.png'
import bottomWave from '../../../assets/Home/bottomWave.png'
import { styled } from 'nativewind';
import Animated, {
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';

const DURATION = 1000;
const DELAY = 500;

const text = ['React', 'Native', 'Reanimated'];

export default function Home() {
    const [isShown, setShown] = useState(false);
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    const StyledButton = styled(Button);
    const opacity1 = useSharedValue(0);
    const opacity2 = useSharedValue(0);
    const opacity3 = useSharedValue(0);
    let deviceWidth = Dimensions.get('window').width;
    let deviceHeight = Dimensions.get('window').height;

    const show = () => {
        if (isShown) {
            opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
            opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
        } else {
            opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
            opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
            opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
        }

        setShown(!isShown);
    };

    return (
        <StyledView className='flex-1'>
            <StyledView className='flex-[.45]' >
                <StyledImage source={topWave} className='sm:w-[519px] sm:right-16' />
                <StyledView className='flex flex-row relative sm:bottom-20 md:bottom-16 h-0' >
                    <StyledView className='flex-[.45] items-center relative' >
                        <StyledImage source={logo} className={`sm:w-[155px] sm:h-[33px] absolute sm:left-4 sm:top-5`} />
                    </StyledView>
                    <StyledView className='flex-[.65] items-center relative'>
                        <StyledImage source={buildingIcon} className={'sm:w-[203px] sm:h-[188px]'} />
                    </StyledView>
                </StyledView>
                <StyledImage source={bottomWave} className='bottom-0 absolute sm:w-96' />
            </StyledView>
            <StyledView className='flex-[.55]' >
                {/* <StyledText>{deviceWidth}</StyledText>
                <StyledText>{deviceHeight}</StyledText> */}
                {/* <StyledView>
                    <Animated.Text style={{ opacity: opacity1 }}>
                        {text[0]}
                    </Animated.Text>
                    <Animated.Text style={{ opacity: opacity2 }}>
                        {text[1]}
                    </Animated.Text>
                    <Animated.Text style={{ opacity: opacity3 }}>
                        {text[2]}
                    </Animated.Text>
                </StyledView>
                <Button title={isShown ? 'Hide' : 'Show'} onPress={show} /> */}

                <StyledView className='items-center p-4'>
                    <StyledText className='p-2 text-lg font-bold'>
                        Discover Our Featured Listings
                    </StyledText>
                    <StyledText className='p-1 text-xs' style={{color:'#9C9C9C'}}>
                        We'll help you find your perfect home
                    </StyledText>
                </StyledView>
            </StyledView>
        </StyledView>
    );
}