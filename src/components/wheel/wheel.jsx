import { useState } from "react"
import styled from "styled-components"


const Wheel = (props) => {

    const [listItems, setListItems] = useState([
        { name: "0", background: "teal" },
        { name: "1", background: "dodgerblue" },
        { name: "2", background: "crimson" },
        { name: "3", background: "darkviolet" },
        { name: "4", background: "orange" },
        { name: "5", background: "red" },
        { name: "6", background: "green" },
        { name: "7", background: "crimson" },
        { name: "8", background: "darkviolet" },
        // { name: "9", background: "orange" },
        // { name: "10", background: "red" },
        // { name: "11", background: "green" },
    ])


    const [nSpinTime] = useState(3000)
    const [currentDeg, setCurrentDeg] = useState(0)
    const [isSpinning, setSpinning] = useState(false)

    const onSpinClicked = e => {
        e.preventDefault()

        let deg = currentDeg + Math.floor(Math.random() * (360 * 10 - 360 + 1) + 360 * 5)
        setCurrentDeg(deg)
        setSpinning(true)



        setTimeout(() => {
            setSpinning(false)
            deg %= 360

            const itemWidth = 360 / listItems.length
            // const startingDeg = ((270 + deg) - itemWidth / 2) % 360
            // const index = Math.floor((360 - startingDeg) / itemWidth) % listItems.length

            const index = listItems.length - 1 - Math.floor( (270 + deg - itemWidth/2) % 360 / itemWidth) % listItems.length


            if (typeof(props.onFinished) === 'function') props.onFinished(listItems[index])

      


            setCurrentDeg(prev => prev % 360)
        }, nSpinTime);
    }

    return (
        <div style={{ overflow: "hidden", background: "#363636",boxSizing: "content-box",position: "relative", border: "12px solid #363636", borderRadius: "50%", width: 500, height: 500 }}>
            <Main>
                <SegmentContainer style={{ transition: isSpinning ? `transform cubic-bezier(0.25, 0.1, 0.25, 1) ${nSpinTime}ms` : undefined, position: "relative", transform: `rotate(${currentDeg}deg)` }}>
                    {listItems.map((item, i) =>
                        <Segment key={i} style={{ transform: `rotate(${i * 360 / listItems.length}deg)` }}>


                            <SegmentBackground
                                style={{
                                    background: `conic-gradient(${item.background} ${100 / listItems.length}%, transparent 0)`,
                                    transform: `rotate(${100 / listItems.length * -1.8}deg)`,
                                }}
                            />

                            <SegmentText>{item.name}</SegmentText>
                        </Segment>

                    )}


                </SegmentContainer>
                <Spin onClick={onSpinClicked}
                    style={isSpinning ?
                        {
                            color: "rgba(255, 255, 255, 0.36)",
                            borderColor: "#363636",
                            fontSize: 24,
                            background: "#363636",
                            pointerEvents: "none"
                        }
                        : null
                    }>
                    spin
                </Spin>
            </Main>

            <Arrow></Arrow>
        </div>
    )
}



export default Wheel


const Main = styled.div`
    user-select: none;
    width: 500px;
    height: 500px;
    position: relative;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
    background: #363636;
    border-radius: 50%;
`

const SegmentContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
`


const Arrow = styled.div`
    position: absolute;
    top: 50%;
    right: -10px;
    transform: translateY(-50%);
    border-top: 18px solid transparent;
    border-bottom: 18px solid transparent;
    border-right: 32px solid #303030;
`


const Spin = styled.button`
    cursor: pointer;
    text-align: center;
    text-transform: uppercase;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100px;
    height: 100px;
    background: white;
    transform: translate(-50%, -50%);
    border: 0px solid dodgerblue;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.7);
    border-radius: 50%;
    font-size: 24px;
    color: #363636;
    font-weight: 600;
    background: linear-gradient(25deg, crimson, orange, crimson);
    border: 6px solid #363636;

    :hover {
		box-shadow: 0 0 8px rgba(0, 0, 0, 0.7);
		color: #242424;
        border-color: #242424;
		background: linear-gradient(45deg, crimson, orange, crimson);
	}

	:active {
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
		background: linear-gradient(75deg, crimson, orange, crimson);
	}
`

const Segment = styled.div`
    position: absolute;
    font-size: 1.3rem;
    border-radius: 50%;
    background: none;
    width: 500px;
    height: 500px;
    text-align: center;
`

const SegmentText = styled.span`
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 18%;
    color: rgba(255, 255, 255, 0.87);
`

const SegmentBackground = styled.span`
    display: block;
    font-size: 5rem;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    border-radius: 50%;
`