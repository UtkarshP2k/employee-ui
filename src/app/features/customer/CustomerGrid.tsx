import { useEffect, useState } from "react";
import { Customer } from "../../models/Customer";
import CustomerList from "./CustomerList";
import { Box, Button, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import agent from "../../api/agent";
import Loader from "../../layout/Loader";




export default function CustomerGrid() {

    async function getCustomerData() {
        try {
            const response = await agent.customer.list();

            if (response.isSuccess) {
                setCustomers(response.result);
                setLoading(false);
            }
            else {
                setCustomers([]);
                setLoading(false);
                //console.log(response.errorMessage);
            }

        }
        catch (error) {
            setCustomers([]);
            setLoading(false);
        }


    }

    const navigate = useNavigate();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);


    const routeChange = (path: string) => {
        navigate(path);
    }

    useEffect(() => {
        console.log("useEffect called....");
        getCustomerData();

    }, [refresh])

    function handleChange() {
        setRefresh(!refresh);
    }

    if (loading) return <Loader />

    return (
        <>
            <Box>
                <Typography variant="h4" align="center">
                    Employee Management System
                </Typography>
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<Add />}
                    color="primary"
                    sx={{ float: 'right', mb: 2 }}
                    onClick={() => routeChange(`/add`)}
                >
                    Add
                </Button>
                <CustomerList customers={customers} handleChange={handleChange} />

            </Box>
        </>
    )
}