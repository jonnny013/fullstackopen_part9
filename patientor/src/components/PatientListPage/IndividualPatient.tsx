import {useEffect, useState} from 'react';
import patientService from '../../services/patients';
import diagnosisService from '../../services/diagnosis';
import {Skeleton, CardContent, Card, Typography} from '@mui/material';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Diagnosis, Patient } from '../../types';
import { useParams } from 'react-router-dom';
import TransgenderIcon from '@mui/icons-material/Transgender';
import { Entry } from '../../types';

const IndividualPatient = () => {
  const [patient, setPatient] = useState<Patient | undefined>(undefined);
  const [ diagnosis, setDiagnosis ] = useState<Diagnosis[] | undefined>(undefined);
  const id = useParams().id;
 
  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await patientService.getIndividualPatient(id);
        setPatient(data);
      }
      const data = await diagnosisService.getAll();
      setDiagnosis(data);
    };
    void getData();
  }, []);

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
        <Skeleton animation='wave' width={350} height={70} />
        <Skeleton animation='wave' width={300} height={35} />
        <Skeleton animation='wave' width={300} height={35} />
        <Skeleton animation='wave' width={150} height={70} />
        <Skeleton animation='wave' width={300} height={35} />
        <Skeleton animation='wave' width={300} height={35} />
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant='h3'>
            {patient.name}
            {getGenderIcon(patient.gender)}
          </Typography>
          <Typography>SSN: {patient.ssn}</Typography>
          <Typography>Occupation: {patient.occupation}</Typography>
          <br />
          <Typography variant='h4'>Entries</Typography>
          {patient.entries &&
            patient.entries.map((entry: Entry) => (
              <div key={entry.id}>
                <Typography>
                  {entry.date}: {entry.description}{' '}
                </Typography>
                <ul>
                  {entry.diagnosisCodes &&
                    entry.diagnosisCodes.map(code => {
                      const matchingDiagnosis = diagnosis?.find(d => d.code === code);
                      return (
                        <li key={code}>
                          {code}:{' '}
                          {matchingDiagnosis
                            ? matchingDiagnosis.name
                            : 'Unknown Diagnosis'}
                        </li>
                      );
                    })}
                </ul>
              </div>
            ))}
        </CardContent>
      </Card>
    </>
  );
};

export default IndividualPatient;
