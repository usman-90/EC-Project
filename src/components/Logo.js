import { Svg, Rect, Defs, Pattern, Use, Image } from 'react-native-svg'

const LogoSVG = () => {

    return (
        <Svg width="180" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <Rect y="0.299805" width="180" height="38.9879" fill="url(#pattern0)" />
            <Rect x="39.3525" y="0.299805" width="138.826" height="5.10121" fill="#FFD549" style="fill:#FFD549;fill:color(display-p3 1.0000 0.8338 0.2875);fill-opacity:1;" />
            <Defs>
                <Pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <Use href="#image0_261_107" transform="scale(0.00202429 0.00934579)" />
                </Pattern>
                <Image id="image0_261_107" width="494" height="107" href="data:image/png;base64,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" />
            </Defs>
        </Svg>
    )
}
export default LogoSVG;