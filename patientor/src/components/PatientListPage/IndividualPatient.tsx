import {useEffect, useState} from 'react';
import patientService from '../../services/patients';
import {Skeleton, CardContent, Card, Typography} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Patient } from '../../types';
import { useParams } from 'react-router-dom';
import TransgenderIcon from '@mui/icons-material/Transgender';

const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const id = useParams().id;

  useEffect(() => {
    const getPatient = async () => {
      if (id) {
        const data = await patientService.getIndividualPatient(id);
        setPatient(data);
      }
    };
    void getPatient();
  }, [id]);

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case 'male':
        return <MaleIcon />;
      case 'female':
        return <FemaleIcon />;
      case 'other':
        return <TransgenderIcon />;
      default:
        throw new Error('Invalid gender');
    }
  };

  if (!patient) {
    return (
      <Card>
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
        <Skeleton animation='wave' />
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant='h2'>
          {patient.name}
          {getGenderIcon(patient.gender)}
        </Typography>
        <Typography>
          SSN: {patient.ssn}
        </Typography>
        <Typography>
          Occupation: {patient.occupation}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IndividualPatient;
