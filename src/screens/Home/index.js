import React from 'react'
import { Image, Text, View } from 'react-native'
import topWave from '../../../assets/Home/topWave.png'
import logo from '../../../assets/Home/logo.png'
import buildingIcon from '../../../assets/Home/buildingIcon.png'
import bottomWave from '../../../assets/Home/bottomWave.png'
import { styled } from 'nativewind';

export default function Home() {
    const StyledView = styled(View);
    const StyledText = styled(Text);
    const StyledImage = styled(Image);
    return (
        <StyledView className='flex-1' style={{ flex: 1 }}>
            <StyledView className='flex-[.4]' >
                <StyledImage source={topWave} style={{ width: 519, right: 60 }} />
                <StyledView style={{ display: 'flex', flexDirection: 'row', position: 'relative', bottom: 80, height: 0 }}>
                    <StyledView style={{ flex: .45, alignItems: 'center', position: 'relative' }}>
                        <StyledImage source={logo} style={{ width: 155, height: 33, position: 'absolute', left: 15, top: 20 }} />
                    </StyledView>
                    <StyledView style={{ flex: .65, alignItems: 'center', position: 'relative' }}>
                        <StyledImage source={buildingIcon} style={{ width: 203, height: 188 }} />
                    </StyledView>
                </StyledView>
                <StyledImage source={bottomWave} style={{ width: 518, bottom: 0, position: 'absolute' }} />
            </StyledView>
            <StyledView className='flex-[.6]' >
                <StyledText>Home</StyledText>
            </StyledView>
        </StyledView>
    );
}