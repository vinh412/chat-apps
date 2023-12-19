CREATE KEYSPACE IF NOT EXISTS chat_apps WITH REPLICATION =
{ 'class' : 'SimpleStrategy',
'replication_factor' : '1'
};