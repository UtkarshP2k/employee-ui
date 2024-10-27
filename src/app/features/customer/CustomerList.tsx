import { Edit, Delete } from "@mui/icons-material";
import { TableContainer, Paper, Table, TableHead, TableBody, Button, TableCell, TableRow, styled, tableCellClasses } from "@mui/material";
import { Customer } from "../../models/Customer";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


interface Props {
    customers: Customer[],
    handleChange: () => void
}

export default function CustomerList({ customers, handleChange }: Props) {

    const navigate = useNavigate();

    const routeChange = (path: string) => {
        navigate(path);
    }

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    function handleDelete(id: number) {
        agent.customer.delete(id)
            .then(data => {
                if (data.isSuccess) {
                    handleChange();
                } else {
                    toast.error('Error occurred!');
                    return;
                }
            })
            .then(() => toast.success('Customer Deleted Successfully!'))
            .catch(error => {
                console.error("Error deleting customer:", error);
                toast.error('Error occurred while deleting customer!');
            });
    }


    return (
        <TableContainer component={Paper} sx={{ mb: 5 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <StyledTableRow>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Address</StyledTableCell>
                        <StyledTableCell align="center">Phone</StyledTableCell>
                        <StyledTableCell align="center">Actions</StyledTableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {customers.map(customer => (
                        <StyledTableRow
                            key={customer.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell align="center">{customer.name}</StyledTableCell>
                            <StyledTableCell align="center">{customer.address}</StyledTableCell>
                            <StyledTableCell align="center">{customer.phone}</StyledTableCell>
                            <StyledTableCell align="center">
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<Edit />}
                                    color="secondary"
                                    onClick={() => routeChange(`/edit/${customer.id}`)}
                                >
                                    Edit
                                </Button> &nbsp;
                                <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<Delete />}
                                    color='error'
                                    onClick={() => handleDelete(customer.id)}
                                >
                                    Delete
                                </Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}