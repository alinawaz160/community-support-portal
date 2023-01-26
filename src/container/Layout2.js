import React from "react";


class Layout2 extends React.Component {
    constructor() {
        super();
    }
    sidebar = () => {
        return (
            <Drawer className="drawer my-10"
                open={true}            >
                <div style={{ width: "200px" }}>
                    <ListItem button>
                        <ListItemText primary={"This is a Home"} />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary={"Account"} />
                    </ListItem>
                </div>
            </Drawer>
        )
    }
    render() {
        return (
            <div>
                
            </div>
        );
    }
}