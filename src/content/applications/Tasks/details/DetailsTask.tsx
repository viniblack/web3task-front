import { useParams } from "react-router-dom"
import { Box, Card, CardContent, Container, Divider, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Helmet } from 'react-helmet-async';
import SuspenseLoader from 'src/components/SuspenseLoader'
import { useTaskService } from "src/services/tasks-service";
import { useTaskServiceHook } from "src/hooks/TaskServiceHook";
import { useEffect } from "react";
import CardTasks from "../../../../components/Task/CardTask";

const DetailsTask = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const taskService = useTaskService();
    const { taskId } = useParams();

    const { handleTask, handleReview, taskData, taskReview, loading, error } = useTaskServiceHook(taskService);

    useEffect(() => {
        const fetchData = async () => {
            await handleTask(Number(taskId));
            await handleReview(Number(taskId));
        };

        fetchData();
    }, []);

    return (
        <>
            <Helmet>
                <title>Web3Task - Task Details</title>
            </Helmet>

            <Container sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{ width: 709, height: '100%', mt: 6 }} >

                    <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'max-content'} >

                        {
                            loading ? <SuspenseLoader />
                                :
                                (
                                    <>
                                        <Box width={isSmallScreen ? '100%' : 709} mt={isSmallScreen ? 2 : 0}>
                                            <CardTasks taskId={taskId} taskData={taskData} loading={loading} />

                                            <Box mt={4} width={isSmallScreen ? '100%' : 679} display={'flex'} flexDirection={isSmallScreen ? 'column' : 'row'} justifyContent={isSmallScreen ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: isSmallScreen ? '100%' : 192, height: 119, justifyContent: 'center', marginBottom: isSmallScreen ? '16px' : '0' }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={'center'}>
                                                            Status
                                                        </Typography>
                                                        <Divider variant="fullWidth" />
                                                        <Typography variant="h6" textAlign={'center'} mt={1}>
                                                            {taskData ? taskData.status : 'Created'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>

                                                <Card sx={{ width: isSmallScreen ? '100%' : 434, height: 119, justifyContent: isSmallScreen ? 'center' : 'left' }}>
                                                    <CardContent style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                                    {/* <CardContent> */}
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Reviews
                                                        </Typography>
                                                        <Divider />                                                 
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                            {taskReview ? (taskReview.map((review: any) => {
                                                                return (
                                                                    <Box>
                                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                                            {review}
                                                                        </Typography>
                                                                    </Box>
                                                                )
                                                            })) : 'No reviews provided for this task.'}
                                                        </Typography>                                                        
                                                    </CardContent>
                                                </Card>
                                            </Box>

                                            <Box mt={4} width={isSmallScreen ? '100%' : 679} display={'flex'} flexDirection={isSmallScreen ? 'column' : 'row'} justifyContent={isSmallScreen ? 'center' : 'space-between'} alignItems={'center'}>
                                                <Card sx={{ width: '100%', height: 200, justifyContent: isSmallScreen ? 'center' : 'left' }}>
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h4" textAlign={'left'} component="div">
                                                            Description
                                                        </Typography>
                                                        <Divider />
                                                        <Typography variant="h6" textAlign={'left'} mt={1} component="div">
                                                            {taskData ? taskData.description : 'No description provided for this task.'}
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </Box>
                                        </Box>

                                    </>
                                )
                        }
                    </Box >

                </Box>
            </Container>

        </>
    )
}

export default DetailsTask