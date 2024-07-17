package com.vinhdd.chatserver.config;

import org.springframework.beans.factory.BeanClassLoaderAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.*;
import org.springframework.data.cassandra.core.cql.keyspace.CreateKeyspaceSpecification;
import org.springframework.data.cassandra.core.cql.keyspace.KeyspaceOption;
import org.springframework.lang.NonNull;

import java.util.List;

@Configuration
public class CassandraConfiguration extends AbstractCassandraConfiguration implements BeanClassLoaderAware {
    String host = System.getenv("CASSANDRA_HOST") == null ? "127.0.0.1" : System.getenv("CASSANDRA_HOST");
    int port = Integer.parseInt(System.getenv("CASSANDRA_PORT") == null ? "9042" : System.getenv("CASSANDRA_PORT"));
    @Override
    @NonNull
    protected List<CreateKeyspaceSpecification> getKeyspaceCreations() {
        CreateKeyspaceSpecification specification = CreateKeyspaceSpecification.createKeyspace("chatapps")
                .with(KeyspaceOption.DURABLE_WRITES, true)
                .withSimpleReplication(1)
                .ifNotExists(true);
        return List.of(specification);
    }
    @Override
    @NonNull
    protected String getKeyspaceName() {
        return "chatapps";
    }

    @Override
    protected int getPort() {
        return port;
    }

    @Override
    protected String getLocalDataCenter() {
        return "datacenter1";
    }

    @Override
    @NonNull
    public String getContactPoints() {
        return host;
    }

    @Override
    @NonNull
    public SchemaAction getSchemaAction() {
        return SchemaAction.CREATE_IF_NOT_EXISTS;
    }

    @Override
    @NonNull
    public String[] getEntityBasePackages() {
        return new String[]{"com.vinhdd"};
    }
}
