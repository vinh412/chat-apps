CREATE KEYSPACE IF NOT EXISTS chatapps WITH REPLICATION =
{ 'class' : 'SimpleStrategy',
'replication_factor' : '1'
};