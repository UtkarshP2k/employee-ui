import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate, useParams } from "react-router-dom"
import { Customer } from "../../models/Customer";
import agent from "../../api/agent";
import { toast } from "react-toastify";
import { useState } from "react";
import Loader from "../../layout/Loader";

export default function CustomerForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const action = id ? 'Edit' : 'Add';

    const form = useForm<Customer>({
        defaultValues: async () => {
            if (id) {
                const response = await agent.customer.details(parseInt(id));
                setLoading(false);
                return response.result;
            }
            else {
                setLoading(false);
            }


        }
    });

    const { register, control, handleSubmit, formState } = form;

    const { errors } = formState;

    const onSubmit = async (data: Customer) => {
        if (!id) {
            try {
                const response = await agent.customer.post(data);

                response.isSuccess ? toast.success('Customer Added Successfully!') : console.log(response);
            } catch (error) {
                return;
            }


        }
        else {
            try {
                const response = await agent.customer.put(parseInt(id), data);

                response.isSuccess ? toast.success('Customer Updated Successfully!') : console.log(response);
            } catch (error) {
                return;
            }


        }

        navigate('/employee');
    }


    if (loading) return <Loader />


    return (
        <>
            <Container>
                <Typography variant="h2" sx={{ mb: 4 }}>
                    {action} Customer
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={2} width='50%'>
                        <TextField
                            fullWidth
                            required
                            id="name"
                            label="Name"
                            sx={{ mb: 4 }}
                            {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Name is required'
                                }
                            })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Typography variant="subtitle1" color='error'>
                            {errors.name?.message}
                        </Typography>

                        <TextField
                            fullWidth
                            required
                            id="phone"
                            label="Phone"
                            type="number"
                            sx={{ mb: 4 }}
                            {...register('phone', {
                                pattern: {
                                    value: /^[\d]{10}$/,
                                    message: 'Invalid Phone number'
                                }
                            })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Typography variant="caption" color='error'>
                            {errors.phone?.message}
                        </Typography>

                        <TextField
                            fullWidth
                            id="address"
                            label="Address"
                            sx={{ mb: 4 }}
                            {...register('address', {
                                required: {
                                    value: true,
                                    message: 'Address is required'
                                }
                            })}
                            InputLabelProps={{ shrink: true }}
                        />
                        <Typography variant="subtitle1" color='error'>
                            {errors.address?.message}
                        </Typography>

                        <Button variant="contained" color="primary" type="submit">
                            Save
                        </Button>
                    </Stack>


                </form>
            </Container>
            <DevTool control={control} />

        </>
    )
}