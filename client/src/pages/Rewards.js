import {Widget } from "web3uikit";
import { Box, Text } from "@mantine/core";

const Rewards = () => {
    return ( <div style={{ display: 'grid', gap: '10px', padding: '20px 10px' }}>

    <section style={{ display: 'flex', gap: '20px' }}>
        <Widget info="Polygon mainet" title="Block Chain" />
        <Widget info="233" title="Number of Ads received" />
    </section>
        <Widget info="4.20 UAT" title="Pending reward" />
        <Widget info="51.27 UAT" title="Rewards received for rating ads" />
        <section style={{ display: 'flex', gap: '20px' }}>
        <Widget info="42.69 %" title="Positve rated ads" />
        <Widget info="57.31 %" title="Negative rated ads" />
    </section>
        <Widget info="369.42 UAT" title="Rewards received for publishing content" />
        <Widget info="420.69 UAT" title="Total rewards paid out" />
</div>)
}

export default Rewards;